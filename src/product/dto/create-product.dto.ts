import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, MaxLength, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ProductFeaturesDto {
    @IsNotEmpty({ message: 'Product feature name must not be empty' })
    name: string;

    @MaxLength(100, { message: 'Product feature description must not be longer than 100 characters' })
    description: string;
}

export class ProductImagesDto {
    @IsUrl(undefined, { message: 'Invalid product URL' })
    url: string;
    
    @MaxLength(100, { message: 'Product image description must not be longer than 100 characters' })
    description: string;
}

export class CreateProductDto {
    @IsNotEmpty({ message: 'Product name must not be empty' })
    name: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'Product value must be higher than zero' })
    value: number;

    @IsNumber()
    @Min(0, { message: 'Invalid amount' })
    amount: number;

    @IsString()
    @IsNotEmpty({ message: 'Product description must not be empty' })
    @MaxLength(1000, { message: 'Product description must not be longer than 1000 characters' })
    description: string;

    @ValidateNested()
    @IsArray() 
    @Type(() => ProductFeaturesDto)
    features: ProductFeaturesDto[];

    @ValidateNested()
    @IsArray() 
    @Type(() => ProductImagesDto)
    images: ProductImagesDto[];

    @IsString()
    @IsNotEmpty({ message: 'Product category must not be empty' })
    category: string;
}