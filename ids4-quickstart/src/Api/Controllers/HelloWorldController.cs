using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

[Route("hello")]
public class World : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return new JsonResult("Hello world");
    }
}