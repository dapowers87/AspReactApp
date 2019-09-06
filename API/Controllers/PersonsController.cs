using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using MediatR;
using Application.Persons;
using Microsoft.Extensions.Logging;
using Application.Activities;
using Newtonsoft.Json;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<PersonsController> _logger;

        public PersonsController(IMediator mediator, ILogger<PersonsController> logger)
        {
            this._logger = logger;
            this._mediator = mediator;
        }

        // GET api/persons
        [HttpGet]
        public async Task<ActionResult<List<Person>>> Get()
        {
            var ip = Request.HttpContext.Connection.RemoteIpAddress.ToString();

            return await _mediator.Send(new List.Query
            {
                IP = ip
            });
        }

        // GET api/persons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> Get(string id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }

        // POST api/persons
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            _logger.LogInformation(JsonConvert.SerializeObject(command));
            return await _mediator.Send(command);
        }

        // PUT api/persons/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(string id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        // DELETE api/persons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        }
    }
}
