import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'

const dbConfig = config.get('db')

export const typeORMconfig : TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    //entities를 이용해서 데이터베이스 테이블을 생성. 그래서 엔티티파일이 어디에 있는지 작성
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    //synchronize를 true로 설정하면 애플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값들을 해당 테이블을 Drop한 후 다시 생성 
    synchronize: dbConfig.synchronize // 
}