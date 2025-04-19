using AuthAPI.Controllers;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System.Linq;

namespace UnitTests
{
    [TestFixture]
    public class WeatherForecastControllerTests
    {
        [Test]
        public void Get_ReturnsExpectedNumberOfForecasts()
        {
            // Arrange
            var mockLogger = new Mock<ILogger<WeatherForecastController>>();
            var controller = new WeatherForecastController(mockLogger.Object);

            // Act
            var result = controller.Get();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(5, result.Count());
            foreach (var forecast in result)
            {
                Assert.That(forecast.TemperatureC, Is.InRange(-20, 55));
                Assert.That(new[]
                {
                    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
                }, Does.Contain(forecast.Summary));
            }
        }
    }
}
