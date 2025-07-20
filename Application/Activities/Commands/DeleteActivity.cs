using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity{
    public class Command : IRequest<Unit>{
        public string Id { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command,Unit>{
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken){
            var activity = await context.Activities.FindAsync(request.Id);
            if(activity == null) throw new Exception("Activity not found");
            context.Activities.Remove(activity);
            await context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}