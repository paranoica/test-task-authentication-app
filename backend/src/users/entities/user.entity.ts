import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, length: 50 })
    login: string;

    @Column({ unique: true, length: 100 })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ length: 100 })
    name: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
}