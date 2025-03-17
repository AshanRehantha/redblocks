import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class SignInDto {
    @IsNotEmpty({message: "email is require"})
    email: string;

    @IsNotEmpty({message: "password is require"})
    password: string;
}

export class SignInServiceResponseDto {
    @IsNotEmpty()
    responseCode: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    message: string;

    @IsArray()
    data: [];
}

export class SignInResponseDto {
    @ValidateNested()
    @Type(() => SignInServiceResponseDto)
    data: SignInServiceResponseDto;

    @IsNotEmpty()
    status: string;

    constructor(partial: Partial<SignInResponseDto>){
        Object.assign(this, partial);
    }
}