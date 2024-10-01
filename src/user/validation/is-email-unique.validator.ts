import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {

    constructor(private userRepository: UserRepository) {}

    async validate(value: string): Promise<boolean> {
        const emailRegistered = await this.userRepository.isEmailRegistered(value);

        return !emailRegistered;
    }
}

export const IsEmailUnique = (validationOptions: ValidationOptions) => {
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueValidator
        })
    }
}