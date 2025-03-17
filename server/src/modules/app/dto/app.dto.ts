import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class AppDetailsDto {
    @IsNotEmpty({message: "name is required"})
    name: number;
}