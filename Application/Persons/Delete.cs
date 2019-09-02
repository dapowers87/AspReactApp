using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using MongoDB.Driver;
using Persistence;
using Persistence.MongoDb;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly MongoDataContext _context;

            public Handler(MongoDataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var query = Builders<Person>.Filter.Where(p => p.Id == request.Id);
                await _context.Persons.DeleteOneAsync(query);
                return Unit.Value;
            }
        }
    }
}