import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    appID!: number;

    @Column({
        type: "varchar",
        nullable: true,
    })
    lastName!: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    firstName!: string;
}