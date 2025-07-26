using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application.Activities.Queries;
using Application.Activities.Commands;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(string id)
    {
        return await Mediator.Send(new GetActivityDetail.Query{Id = id});
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        return Ok(await Mediator.Send(new CreateActivity.Command{Activity = activity}));
    }

    [HttpPut]
    public async Task<IActionResult> EditActivity(Activity activity)
    {

        return Ok(await Mediator.Send(new EditActivity.Command{Activity = activity}));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(string id)
    {
        return Ok(await Mediator.Send(new DeleteActivity.Command{Id = id}));
    }

}
