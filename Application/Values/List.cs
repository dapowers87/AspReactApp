using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;

namespace Application.Values
{
    public class List
    {
        public class Query : IRequest<List<Value>> { }

        public class Handler : IRequestHandler<Query, List<Value>>
        {
            public Task<List<Value>> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = new List<Value>(){
                    new Value
                    {
                        id = 1,
                        value = "value1"
                    },
                    new Value
                    {
                        id = 2,
                        value = "value2"
                    },
                    new Value
                    {
                        id = 3,
                        value = "value3"
                    },
                    new Value
                    {
                        id = 4,
                        value = "value4"
                    }
                };

                return Task.FromResult(list);
            }
        }
    }
}