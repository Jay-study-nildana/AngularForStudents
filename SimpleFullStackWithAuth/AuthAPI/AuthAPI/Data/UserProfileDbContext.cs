using AuthAPI.Domain;
using Microsoft.EntityFrameworkCore;

namespace AuthAPI.Data
{
    public class UserProfileDbContext : DbContext
    {
        public UserProfileDbContext(DbContextOptions<UserProfileDbContext> options) : base(options)
        {
        }

        public DbSet<UserProfile> UserProfiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure UserProfile entity
            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(256);
                entity.HasIndex(e => e.Email).IsUnique(false); // Index for faster lookups
            });
        }
    }
}
