using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AuthAPI.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "38e75b6c-b8ec-4951-c481-946a2f8e8642";
            var writerRoleId = "a850f27d-35b2-5335-b8cf-2cc11c8d7904";
            var AdminRoleId = "a850f27d-35b2-5335-b8cf-2cc11c8d1234";


            // Create Reader and Writer Role
            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId
                },
                new IdentityRole()
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = writerRoleId
                },
                                new IdentityRole()
                {
                    Id = AdminRoleId,
                    Name = "Admin",
                    NormalizedName = "Admin".ToUpper(),
                    ConcurrencyStamp = writerRoleId
                }
            };

            // Seed the roles
            builder.Entity<IdentityRole>().HasData(roles);


            // Create an Admin User
            var adminUserId = "f3d378fd-e54d-5f4c-9219-b2b2f92a017e";
            var admin = new IdentityUser()
            {
                Id = adminUserId,
                UserName = "admin@BungieCordBlog.com",
                Email = "admin@BungieCordBlog.com",
                NormalizedEmail = "admin@BungieCordBlog.com".ToUpper(),
                NormalizedUserName = "admin@BungieCordBlog.com".ToUpper()
            };

            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Password@6969");

            builder.Entity<IdentityUser>().HasData(admin);

            // Give Roles To Admin

            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new()
                {
                    UserId = adminUserId,
                    RoleId = readerRoleId
                },
                new()
                {
                    UserId = adminUserId,
                    RoleId = writerRoleId
                },
                new()
                {
                    UserId = adminUserId,
                    RoleId = AdminRoleId
                }

            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);

            // Create a Reader User
            var readerUserId = "b3d378fd-e54d-5f4c-9219-b2b2f92a017e";
            var readerUser = new IdentityUser()
            {
                Id = readerUserId,
                UserName = "reader@BungieCordBlog.com",
                Email = "reader@BungieCordBlog.com",
                NormalizedEmail = "reader@BungieCordBlog.com".ToUpper(),
                NormalizedUserName = "reader@BungieCordBlog.com".ToUpper()
            };
            readerUser.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(readerUser, "Password@1234");
            builder.Entity<IdentityUser>().HasData(readerUser);

            // Assign Reader Role to Reader User
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                UserId = readerUserId,
                RoleId = readerRoleId
            });

            // Create a Writer User
            var writerUserId = "c3d378fd-e54d-5f4c-9219-b2b2f92a017e";
            var writerUser = new IdentityUser()
            {
                Id = writerUserId,
                UserName = "writer@BungieCordBlog.com",
                Email = "writer@BungieCordBlog.com",
                NormalizedEmail = "writer@BungieCordBlog.com".ToUpper(),
                NormalizedUserName = "writer@BungieCordBlog.com".ToUpper()
            };
            writerUser.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(writerUser, "Password@5678");
            builder.Entity<IdentityUser>().HasData(writerUser);

            // Assign Writer and Reader Roles to Writer User
            var writerUserRoles = new List<IdentityUserRole<string>>()
            {
                new IdentityUserRole<string>
                {
                    UserId = writerUserId,
                    RoleId = writerRoleId
                },
                new IdentityUserRole<string>
                {
                    UserId = writerUserId,
                    RoleId = readerRoleId
                }
            };
            builder.Entity<IdentityUserRole<string>>().HasData(writerUserRoles);
        }
    }
}
