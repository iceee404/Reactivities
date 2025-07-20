using Domain;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.Activities.Commands;

public class EditActivity{
    public class Command : IRequest<Activity>{
        public required Activity Activity { get; set; }

    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command,Activity>{
        public async Task<Activity> Handle(Command request, CancellationToken cancellationToken){
            var activity = await context.Activities.FindAsync(request.Activity.Id);
            if(activity == null) throw new Exception("Activity not found");
            mapper.Map(request.Activity, activity);
            await context.SaveChangesAsync(cancellationToken);
            return activity;
        }
    }
}