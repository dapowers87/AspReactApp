using Domain;
using MongoDB.Driver;
using Persistence.Model;

namespace Persistence.MongoDb
{
    public class MongoDataContext
    {
        private readonly IMongoDatabase _database = null;

        public MongoDataContext(MongoSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            if (client != null)
            {
                _database = client.GetDatabase(settings.Database);
            }
        }

        public IMongoCollection<Person> Persons
        {
            get
            {
                return _database.GetCollection<Person>("Persons");
            }
        }
    }
}