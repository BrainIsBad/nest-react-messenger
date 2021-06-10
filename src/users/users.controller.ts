import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService) {
    }

    @Get()
    getAll() {
        return 'Hello';
    }

    @Post()
    create(@Body() dto : CreateUserDto) : Promise<User> {
        return this.userService.create(dto);
    }

    @Delete(':id')
    remove(@Param('id') id : number) {
        return this.userService.remove({id});
    }
}
