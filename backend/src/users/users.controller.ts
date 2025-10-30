import { Controller, Get, Patch, Body, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get("profile")
    async getProfile(@CurrentUser() user: any) {
        return this.usersService.findById(user.userId);
    }

    @Patch("profile")
    async updateProfile(
        @CurrentUser() user: any,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(user.userId, updateUserDto);
    }
}