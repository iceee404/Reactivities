using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetail{
    public class Query : IRequest<Activity>{
        public string Id { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Query,Activity>{
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken){
            return await context.Activities.FindAsync(request.Id) ?? throw new Exception("Activity not found");
        }
    }
}