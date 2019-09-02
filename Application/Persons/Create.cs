using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Persistence.MongoDb;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int Age { get; set; }
            public string Location { get; set; }
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
                var person = new Person
                {
                    Id = request.Id,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Age = request.Age,
                    Location = request.Location
                };

                try
                {
                    await _context.Persons.InsertOneAsync(person);
                    return Unit.Value;
                }
                catch (Exception)
                {
                    throw new Exception("Problem saving changes");
                }
            }
        }
    }
}