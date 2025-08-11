using Domain;
using MediatR;
using Persistence;
using Application.Core;

namespace Application.Activities.Commands;

public class DeleteActivity{
    public class Command : IRequest<Result<Unit>>{
        public string Id { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command,Result<Unit>>{
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken){
            var activity = await context.Activities.FindAsync(request.Id);
            if(activity == null) return Result<Unit>.Failure("Activity not found",404);
            context.Activities.Remove(activity);
            var result = await context.SaveChangesAsync(cancellationToken);
            if(result > 0) return Result<Unit>.Success(Unit.Value);
            return Result<Unit>.Failure("Failed to delete activity",400);
        }
    }
}