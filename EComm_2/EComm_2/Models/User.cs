using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EComm_2.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; } 
        public string? Email { get; set; }


        public string? Username { get; set; }


        public string? Password { get; set; } 

        public int? Age { get; set; } 

        public string? Gender { get; set; }

        public string? Mobile { get; set; }

        public string? Address { get; set; }

        public string Role { get; set; } = "User"; 


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    }
}
