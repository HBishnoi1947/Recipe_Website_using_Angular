import { Ingrident } from "../../../shared/ingridient.model";

export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingridients :Ingrident[]

    constructor(name:string, description: string, imagePath: string, ingridients: Ingrident[]){
        this.name=name;
        this.description=description;
        this.imagePath=imagePath;
        this.ingridients = ingridients;
    }
}