
using Microsoft.AspNetCore.Mvc;

namespace api.application
{
    public class OperationResult<T> 
        where T : class
    {
        public T Result { get; set; }
        public bool IsSuccess { get; set; }
        public ResultType ResultType { get; set; }
        public object Input { get; set; }

        // private OperationResult()
        // { }

        public static OperationResult<T> Success(T result)
            => new OperationResult<T>
            {
                Result = result,
                IsSuccess = true,
                ResultType = ResultType.Ok
            };

        public static OperationResult<T> Failure(ResultType type, object input)
            => new OperationResult<T>
            {
                Result = null,
                ResultType = type,
                Input = input
            };

        public ActionResult<T> ToActionResult()
        {
            switch (ResultType)
            {
                case ResultType.Ok:
                    return new OkObjectResult(Result);
                case ResultType.NoContent:
                    return new NoContentResult();
                case ResultType.BadRequest:
                    return new BadRequestObjectResult(Input);
                default:
                    return new NotFoundObjectResult(Input);
            }
        }
    }

    public enum ResultType
    {
        Ok,
        NoContent,

        NotFound,
        BadRequest
    }
}