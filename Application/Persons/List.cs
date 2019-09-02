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
        public class Query : IRequest<List<Person>> { }

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
                var list = await _db.Persons.Find(filter).ToListAsync();

                return list;
            }
        }
    }
}