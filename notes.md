# NestJS Tutorial

## Nest CLI

Anvendelse af nest cli til at danne filer:

nest g module prisma

nest g service prisma --no-spec 
    - vil automatisk danne test filer, --no-spec = ingen test filer 


## Global Module

Case: Vi vil forbinde vores prisma module til authModule f.eks. - 

`
@Module({
    imports: [PrismaModule],
    ... `

Vi vil forbinde vores PrismaService til AuthService

`@Injectable({})  
export class AuthService {
    constructor(private prisma: PrismaService) {}`

Vi får fejl:  
UnknownDependenciesException [Error]: Nest can't resolve dependencies of the AuthService (?). Please make sure that the argument PrismaService at index [0] is available in the AuthModule context.

Det sker fordi PrismaService ikke er tilføjet som exports i PrismaModule:  
`@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}`

Vi vil skulle gentage import af PrismaModule i alle de moduler der skal bruge vores database. 

For at undgå dette kan vi danne et globalt modul.   
Det kan gåres simpelt ved at tilføje endnu decorator @Global. - Når vi har tilføjet PrismaService som del af exports, har alle moduler nu adgang til PrismaModule, så længe det er importeret i root/app.module


## Data Transfer Objects

`@Post('signup')
    signup(@Req() req: Request) {
        console.log(req.body);
        
        return this.authService.signup()
    } `

Her bruger vi @Reg decorator og Request object fra express - dette er ikke den reneste måde at håndterer requests, - istedet skal vi bruge dto (data transfer object)

` @Post('signup')
    signup(@Body() dto: any) {
        console.log({
            dto
        });
        
        return this.authService.signup()
    } `


## Validation & Pipes - class-validator class-transformer

Vi har oprettet en dto folder for validering af data. - 
Til det bruger vi Pipes (se nestJS docs), nærmere bestemt class-validator og class-transformer

Vi får en fejl når vi forsøger at bruge class-validator i auth.dto.ts - fordi vi ikke har configureret main.ts til at useGlobalPipes

Her kan vi også transformere data, - forestil at der forsøges at injecte noget yderliger data til vores signup funktion. - Hvis vi tilføje whitelist: true til `app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))` - vil al data som ikke er del af dto fjernes 



## Testing, e2e

added --watch to test:e2e, for running test on every change, and --no-cache to script in package.json

added dotenv package, and specified which .env file to use, i.e. .evn.test

added hook to package.json - "pretest:e2e"





