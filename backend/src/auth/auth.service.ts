import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { User } from "../users/entities/user.entity";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { login, email, password, name } = registerDto;
        const existingUser = await this.userRepository.findOne({
            where: [{ email }, { login }],
        });

        if (existingUser) {
            if (existingUser.email === email) throw new ConflictException("Email already exists");
            if (existingUser.login === login) throw new ConflictException("Login already exists");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = this.userRepository.create({
            login,
            email,
            password: hashedPassword,
            name,
        });

        await this.userRepository.save(user);

        const payload = { sub: user.id, email: user.email, login: user.login };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            user: {
                id: user.id,
                login: user.login,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
        };
    }

    async login(loginDto: LoginDto) {
        const { loginOrEmail, password } = loginDto;
        const user = await this.userRepository.findOne({
            where: [{ email: loginOrEmail }, { login: loginOrEmail }],
        });

        if (!user)
            throw new UnauthorizedException("Invalid credentials");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials");

        const payload = { sub: user.id, email: user.email, login: user.login };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            user: {
                id: user.id,
                login: user.login,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
        };
    }

    async validateUser(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException("User not found");
        
        return user;
    }
}