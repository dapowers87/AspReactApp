using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core;
using Persistence;
using Persistence.MongoDb;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Person>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Person>
        {
            private readonly MongoDataContext _context;

            public Handler(MongoDataContext context)
            {
                this._context = context;
            }

            public async Task<Person> Handle(Query request, CancellationToken cancellationToken)
            {
                var person = await _context.Persons.FindSync<Person>(_ => _.Id == request.Id).SingleAsync();

                return person;
            }
        }
    }
}