using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using MediatR;
using Application.Persons;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Application.Activities;

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

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<List<Person>>> Get()
        {
            return await _mediator.Send(new List.Query());
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
            _logger.LogDebug("Create method called for person: " + JsonConvert.SerializeObject(command));
            return await _mediator.Send(command);
        }

        // PUT api/persons/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] Person person)
        {
        }

        // DELETE api/persons/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
        }
    }
}
