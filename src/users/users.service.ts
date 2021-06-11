import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import * as bcrypt from 'bcryptjs';
import { Role } from '../roles/roles.model';
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRep : typeof User,
                @InjectModel(Role) private roleRep : typeof Role) {
    }

    async getAll() {
        return await this.userRep.findAll({include: {all: true}});
    }

    async create(dto: CreateUserDto) : Promise<User> {
        const hashedPass = bcrypt.hash(dto.password);
        const user = await this.userRep.create({
            ...dto,
            password: hashedPass
        });

        const [role] = await this.roleRep.findOrCreate({
            where: {value: 'USER'}, defaults: {description: 'User role'}
        });

        await user.$set('roles', [role.id]);

        user.roles = [role];

        return user;
    }

    async remove(opts) {

    }

    async getByEmail(email:string) : Promise<User> {
        return await this.userRep.findOne({where: {email}, include: {all: true}});
    }

}
