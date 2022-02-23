if( process.env.NODE_ENV !== 'production' ){
    require( 'dotenv' ).config()
}
const secret = process.env.JWT_SECRET_PROD;
