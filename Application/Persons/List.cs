using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using MongoDB.Bson;
using MongoDB.Driver;
using Persistence.MongoDb;

namespace Application.Persons
{
    public class List
    {
        public class Query : IRequest<List<Person>>
        {
            public string IP { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Person>>
        {
            private readonly MongoDataContext _db;

            public Handler(MongoDataContext db)
            {
                this._db = db;
            }

            public async Task<List<Person>> Handle(Query request, CancellationToken cancellationToken)
            {
                FilterDefinition<Person> filter = FilterDefinition<Person>.Empty;
                var list = await _db.Persons.Find(p => p.Ip == request.IP).ToListAsync();

                if(list.Count == 0)
                {
                    list = GetPeople(request.IP);
                    await _db.Persons.InsertManyAsync(list);
                    list = await _db.Persons.Find(p => p.Ip == request.IP).ToListAsync();
                }

                return list;
            }

            private List<Person> GetPeople(string ip)
            {
                var result = new List<Person>()
                {
                    new Person
                    {
                        FirstName = "David",
                        LastName = "Powers",
                        Age = 32,
                        Location = "Austin",
                        Ip = ip
                    },
                    new Person
                    {
                        FirstName = "Anne",
                        LastName = "Powers",
                        Age = 60,
                        Location = "Kyle",
                        Ip = ip
                    },
                    new Person
                    {
                        FirstName = "Aaron",
                        LastName = "G",
                        Age = 30,
                        Location = "Grapevine",
                        Ip = ip
                    }
                };

                return result;
            }

        }
    }
}