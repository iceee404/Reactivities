using Domain;
using MediatR;
using Persistence;
using Application.Activities.DTOs;
using AutoMapper;
using Application.Core;

namespace Application.Activities.Commands;

public class CreateActivity{
    public class Command : IRequest<Result<string>>{
        public CreateActivityDto ActivityDto { get; set; }
    }
    public class Handler(AppDbContext context,IMapper mapper) : IRequestHandler<Command,Result<string>>{
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken){
            var activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities.Add(activity);
            var result = await context.SaveChangesAsync(cancellationToken);
            if(result > 0) return Result<string>.Success("Activity created successfully");
            return Result<string>.Failure("Failed to create activity",400);
        }
    }
}