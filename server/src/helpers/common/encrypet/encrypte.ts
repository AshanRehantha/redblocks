import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class Encryption {

    private readonly randSecretNumber: string;

    constructor() {
        this.randSecretNumber = '72524355972236694078568893935640535804138752629234';
    }
    async passwordHashed(password: string): Promise<string> {
            const saltRounds = 15;
            const hash = bcrypt.hashSync(password, saltRounds);
            return hash;
    }

    async passwordVerify(password: string, hashedPassword: string): Promise<boolean> {
            return await bcrypt.compare(password, hashedPassword);
    }

    async newPasswordHashed(password: string):Promise<any> {
        const passwordHashed = await this.passwordHashed(password);
        return {
            newPassword: password,
            hashedPassword:passwordHashed, 
        }
    }

    async createRandomPassword(length:number): Promise<any> {
        const randNumber = randomBytes(length)
        .toString('base64') 
        .slice(0, length)
        .replace(/\+/g, '0')
        .replace(/\//g, '1');

        return this.newPasswordHashed(randNumber);
    }


    async generateVerificationToken(): Promise<any> {
        const randNumber = uuidv4();
        const token = jwt.sign({ id: randNumber }, this.randSecretNumber, { expiresIn: '1d' });

        return {
            randToken:token,
            randNumber:randNumber
        }; 
    }

    async verifyEmailToken (token: string): Promise<any> {
        try{
            const decoded = jwt.verify(token, this.randSecretNumber) as any;
            
            return decoded;
        }catch(error){
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
        
    }

}