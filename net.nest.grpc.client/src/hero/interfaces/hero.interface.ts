
export interface HeroById {
    id: number;
 }

 export interface Hero {

    id : number;
    name : string;

}
 
export interface HeroesService {
    findOne(heroById : HeroById): Promise<Hero>
}