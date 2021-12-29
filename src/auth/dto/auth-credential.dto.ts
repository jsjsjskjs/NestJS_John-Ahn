import { IsString, Matches, MaxLength, MinLength } from "class-validator"

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // 영어와 숫자만 가능하도록 정규 표현식 사용
    // 두번째 인자에는 유효성에 맞지 않는 경우 메시지 전달이 가능
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: '비밀번호는 오직 영어와 숫자만 가능합니다'
    })
    password: string
}