/* eslint-disable prettier/prettier */
import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Department } from './schemas/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { StudentService } from '../student/student.service';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel('Department') //  This decorator is used to inject a MongoDB/Mongoose model into the DepartmentsService class
    private departmentModel: mongoose.Model<Department>,
    
    @Inject(forwardRef(() => StudentService))
    private studentService: StudentService,
  ) {}

  // create Department
  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentModel.create(createDepartmentDto);
    return department;
  }

  // find All Department
  async findAllDepartment() {
    const department = await this.departmentModel.find();

    return department;
  }

  // find One Department
  async findOneDepartment(id: string) {
    const department = await this.departmentModel.findById(id);

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return department;
  }

  // update One Department
  async findOneDepartmentAndUpdate(id: string, attrs: Partial<Department>) {
    const department = await this.departmentModel.findById(id);

    if (!department) {
      throw new NotFoundException(
        'department not found in updateDepartmentById in department.service.ts',
      );
    }

    Object.assign(department, attrs);
    return department.save();
  }

  // delete One Department
  async findOneDepartmentByIdAndDelete(id: string) {
    const department = await this.departmentModel.findById(id);

    if (!department) {
      throw new NotFoundException(
        'department not found in updateDepartmentById in department.service.ts',
      );
    }

    await this.studentService.deleteAllStudent(id);
    return this.departmentModel.findByIdAndDelete(id);
  }

  // delete All Department
  async deleteall(){
    return this.departmentModel.deleteMany();
  }

  // 1 query
  async aggregation1() {
    const pipeline: any = [
      {
        $group:{
            _id: "$batch",
            totalStudents: {
              $sum: "$occupiedSeats",
            },
            branches: {
              $push: {
                initials: "$initials",
                occupiedSeats: "$occupiedSeats",
              },
            },
          },
      },
      {
        $project: {
            dept: {
              $map: {
                input: "$branches",
                as: "data",
                in: {
                  k: "$$data.initials",
                  v: "$$data.occupiedSeats",
                },
              },
            },
            totalStudents: 1,
          },
      },
      {
        $project: {
            year: "$_id",
            branches: {
              $arrayToObject: "$dept",
            },
            totalStudents: 1,
          },
      },
      {
        $sort: {
            totalStudents: -1,
          },
      },
    ]

    return await this.departmentModel.aggregate(pipeline);
  }


  // 2 query
  async aggregation2(obj) {
    const pipeline: any = [
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'departmentId',
          as: 'result1'
        }
      },
      {
        $unwind: {
          path: '$result1'
        }
      },
      {
        $project: {
          departmentName: '$name',
          initials: 1,
          batch: 1,
          sid: '$result1._id',
          sName: '$result1.name',
          Sem: '$result1.sem'
        }
      },
      {
        $lookup: {
          from: 'attendances',
          localField: 'sid',
          foreignField: 'studentId',
          as: 'result2'
        }
      },
      {
        $unwind: {
          path: '$result2'
        }
      },
      {
        $project: {
          _id: 0,
          did: '$_id',
          departmentName: '$departmentName',
          initials: 1,
          batch: 1,
          sid: '$sid',
          sName: '$sName',
          Sem: '$Sem',
          date: '$result2.date',
          isPresent: '$result2.isPresent'
        }
      },
      {
        $match: {
          date: new Date(obj.date),
          isPresent: false
        }
      }
    ];

    if (obj.batch) {
      pipeline.push({
        $match: {
          batch: obj.batch
        }
      });
    }

    if (obj.Sem) {
      pipeline.push({
        $match: {
          Sem: obj.Sem
        }
      });
    }

    if (obj.departmentName) {
      pipeline.push({
        $match: {
          departmentName: obj.departmentName
        }
      });
    }

    return await this.departmentModel.aggregate(pipeline);
  }


  // 3 query
  async aggregation3(obj) {
    const pipeline: any = [
    {
      $lookup: {
        from: "students",
        localField: "_id",
        foreignField: "departmentId",
        as: "r1",
      },
    },
    {
      $unwind: {
        path: "$r1",
      },
    },
    {
      $project: {
        _id: 0,
        did: "$_id",
        sName: "$r1.name",
        dname: "$name",
        batch: 1,
        sem: "$r1.sem",
        sid: "$r1._id",
      },
    },
    {
      $lookup: {
        from: "attendances",
        localField: "sid",
        foreignField: "studentId",
        as: "r2",
      },
    },
    {
      $unwind: {
        path: "$r2",
      },
    },
    {
      $project: {
        batch: 1,
        did: 1,
        sName: 1,
        dname: 1,
        sem: 1,
        date: "$r2.date",
        isPresent: "$r2.isPresent",
      },
    },
    {
      $match: {
        date: {
          $lte: ("2024-05-09"),
        },
      },
    },
    {
      $group: {
        _id: "$sName",
        total: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $addFields: {
        totaldays: {
          $size: "$total",
        },
      },
    },
    {
      $unwind: {
        path: "$total",
      },
    },
    {
      $project: {
        sName: "$total.sName",
        dname: "$total.dname",
        batch: "$total.batch",
        sem: "$total.sem",
        date: "$total.date",
        isPresent: "$total.isPresent",
        totaldays: 1,
      },
    },
    {
      $match: {
        isPresent: false,
      },
    },
    {
      $group: {
        _id: "$sName",
        data: {
          $push: "$$ROOT",
        },
        absentdays: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        data: {
          $arrayElemAt: ["$data", 0],
        },
        absentdays: 1,
        totaldays: 1,
      },
    },
    {
      $project: {
        sName: "$data.sName",
        dname: "$data.dname",
        batch: "$data.batch",
        sem: "$data.sem",
        totaldays: "$data.totaldays",
        absentdays: 1,
        absence_percentage: {
          $multiply: [
            {
              $divide: [
                "$absentdays",
                "$data.totaldays",
              ],
            },
            100,
          ],
        },
      },
    },
    {
      $match: {
        absence_percentage: {
          $lte: 75,
        },
      },
    },
  ]

  if (obj.department) {
      pipeline.unshift({
        $match: {
          name: obj.department
        }
      });
    }

    if (obj.batch) {
      pipeline.unshift({
        $match: {
          batch: obj.batch
        }
      });
    }

  return await this.departmentModel.aggregate(pipeline);
}



  // 4 query
  async aggregation4(obj) {
    const pipeline: any = [
    {
      $match:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          name: "MBA",
        },
    },
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: "$batch",
          department: {
            $push: {
              initials: "$initials",
              data: {
                totalStudentsNow: "$occupiedSeats",
                totalStudentsIntake:
                  "$availableSeats",
                availableIntake: {
                  $subtract: [
                    "$availableSeats",
                    "$occupiedSeats",
                  ],
                },
              },
            },
          },
          totalStudentsNow: {
            $sum: "$occupiedSeats",
          },
          totalStudentsIntake: {
            $sum: "$availableSeats",
          },
        },
    },
    {
      $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          _id: 0,
          batch: "$_id",
          data: {
            $map: {
              input: "$department",
              as: "departmentData",
              in: {
                k: "$$departmentData.initials",
                v: "$$departmentData.data",
              },
            },
          },
          totalStudentsNow: 1,
          totalStudentsIntake: 1,
          availableIntake: {
            $subtract: [
              "$totalStudentsIntake",
              "$totalStudentsNow",
            ],
          },
        },
    },
    {
      $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          batch: 1,
          department: {
            $arrayToObject: "$data",
          },
          totalStudentsNow: 1,
          totalStudentsIntake: 1,
          availableIntake: 1,
        },
      },
    ]


    if (obj.department) {
      pipeline.unshift({
        $match: {
          name: obj.department
        }
      });
    }

    if (obj.batch) {
      pipeline.unshift({
        $match: {
          batch: obj.batch
        }
      });
    }

    return await this.departmentModel.aggregate(pipeline);
  }

}
