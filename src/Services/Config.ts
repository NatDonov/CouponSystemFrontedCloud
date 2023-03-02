
abstract class Config{


}

class Development extends Config{
    public urls = {
        "admin":"http://localhost:8080/api/admin",
        "customers": "http://localhost:8080/api/customer",
        "company":"http://localhost:8080/api/company",
        "auth":"http://localhost:8080/api/login",
    }
}

class Production extends Config{
    public urls = {
        "admin":"https://couponsystembackendcloud-production-7bb4.up.railway.app/api/admin",
        "customers": "https://couponsystembackendcloud-production-7bb4.up.railway.app/api/customer",
        "company":"https://couponsystembackendcloud-production-7bb4.up.railway.app/api/company",
        "auth":"https://couponsystembackendcloud-production-7bb4.up.railway.app/api/login",
    }
}

const global = process.env.NODE_ENV === "development" ? new Development() : new Production();
export default global;