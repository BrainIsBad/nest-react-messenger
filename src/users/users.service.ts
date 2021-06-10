import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import * as bcrypt from 'bcryptjs';
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRep : typeof User) {
    }

    async create(dto: CreateUserDto) : Promise<User> {
        const hashedPass = bcrypt.hash(dto.password);
        const user = await this.userRep.create({
            ...dto,
            password: hashedPass
        });

        return user;
    }

    async remove(opts) {

    }

}
