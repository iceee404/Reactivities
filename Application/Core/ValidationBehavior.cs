// using System;
// using FluentValidation;
// using MediatR;

// namespace Application.Core;

// public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
//     : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
// {

    
//     public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
//     {
//         if (validator == null) return await next();

//         var validationResult = await validator.ValidateAsync(request, cancellationToken);

//         if (!validationResult.IsValid)
//         {
//             throw new ValidationException(validationResult.Errors);
//         }

//         return await next();
//     }
// }

using System;
using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        // 添加调试信息
        Console.WriteLine($"🔍 ValidationBehavior triggered for: {typeof(TRequest).Name}");
        Console.WriteLine($"🔍 Validator is: {(validator == null ? "NULL" : "NOT NULL")}");
        
        if (validator == null) 
        {
            Console.WriteLine($"⚠️ No validator found for {typeof(TRequest).Name}, skipping validation");
            return await next();
        }

        Console.WriteLine($"✅ Running validation for {typeof(TRequest).Name}");
        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        Console.WriteLine($"🔍 Validation result: {(validationResult.IsValid ? "VALID" : "INVALID")}");
        Console.WriteLine($"🔍 Error count: {validationResult.Errors.Count}");

        if (!validationResult.IsValid)
        {
            Console.WriteLine("❌ Validation failed, throwing exception");
            foreach (var error in validationResult.Errors)
            {
                Console.WriteLine($"  - {error.PropertyName}: {error.ErrorMessage}");
            }
            throw new ValidationException(validationResult.Errors);
        }

        Console.WriteLine("✅ Validation passed, continuing to handler");
        return await next();
    }
}
