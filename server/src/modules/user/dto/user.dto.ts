import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class CustomerDto {
    @IsNotEmpty({message: "first name is require"})
    firstName: string;

    @IsNotEmpty({message: "last name is require"})
    lastName: string;

    @IsNotEmpty({message: "address is require"})
    address: string;

    @IsNotEmpty({message: "contact number is require"})
    contactNumber: string;

    @IsNotEmpty({message: "email is require"})
    email: string;
}

export class UserCreateDto {
    @IsNotEmpty({message: "first name is require"})
    firstName: string;

    @IsNotEmpty({message: "last name is require"})
    lastName: string;

    @IsNotEmpty({message: "user name is require"})
    userName: string;

    @IsNotEmpty({message: "email is require"})
    email: string;

    @IsNotEmpty({message: "contact number is require"})
    contactNumber: string;

    @IsNotEmpty({message: "password is require"})
    password: string;

    @IsNotEmpty({message: "department is require"})
    department: number;

    @IsNotEmpty({message:"designation is require"})
    designation: string
}



export class CustomerDtoServiceResponseDto {
    @IsNotEmpty()
    responseCode: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    message: string;

    @IsArray()
    data: [];
}

export class CustomerDtoResponseDto {
    @ValidateNested()
    @Type(() => CustomerDtoServiceResponseDto)
    data: CustomerDtoServiceResponseDto;

    @IsNotEmpty()
    status: string;

    constructor(partial: Partial<CustomerDtoResponseDto>){
        Object.assign(this, partial);
    }
}


export class GetCustomerDto {
    @IsOptional()
    pageId: string;

}

export class GetCustomerServiceResponseDto {
    @IsNotEmpty()
    responseCode: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    message: string;

    @IsArray()
    data: [];
}

export class GetCustomerResponseDto {
    @ValidateNested()
    @Type(() => GetCustomerServiceResponseDto)
    data: GetCustomerServiceResponseDto;

    @IsNotEmpty()
    status: string;

    constructor(partial: Partial<GetCustomerResponseDto>){
        Object.assign(this, partial);
    }
}


export class UpdatePasswordFirstTimeDto {
    @IsNotEmpty()
    currentPassword:string;

    @IsNotEmpty()
    newPassword:string

}

export class UpdatePasswordFirstTimeServiceResponseDto {
    @IsNotEmpty()
    responseCode: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    message: string;

    @IsArray()
    data: [];
}

export class UpdatePasswordFirstTimeResponseDto {
    @ValidateNested()
    @Type(() => UpdatePasswordFirstTimeServiceResponseDto)
    data: UpdatePasswordFirstTimeServiceResponseDto;

    @IsNotEmpty()
    status: string;

    constructor(partial: Partial<UpdatePasswordFirstTimeResponseDto>){
        Object.assign(this, partial);
    }
}

export class ResetPasswordDto {
    @IsNotEmpty()
    email:string;

}

export class ResetPasswordServiceResponseDto {
    @IsNotEmpty()
    responseCode: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    message: string;

    @IsArray()
    data: [];
}

export class ResetPasswordResponseDto {
    @ValidateNested()
    @Type(() => ResetPasswordServiceResponseDto)
    data: ResetPasswordServiceResponseDto;

    @IsNotEmpty()
    status: string;

    constructor(partial: Partial<ResetPasswordResponseDto>){
        Object.assign(this, partial);
    }
}

export class EmailVerifyDto {
    @IsNotEmpty()
    token:string;

}

export class GetPermissionDto {
    @IsNotEmpty()
    pageName:string;

    @IsNotEmpty()
    action:string;

}

export class GetModulesDto {
    @IsOptional()
    pageName:string;
}