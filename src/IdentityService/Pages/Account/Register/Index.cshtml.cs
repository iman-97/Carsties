using IdentityService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Security.Claims;

namespace IdentityService.Pages.Register;

[SecurityHeaders]
[AllowAnonymous]
public class Index : PageModel
{
	private readonly UserManager<ApplicationUser> _userManager;

	[BindProperty]
	public RegisterViewModel Input { get; set; }

	[BindProperty]
	public bool RegisterSuccess { get; set; }

	public Index(UserManager<ApplicationUser> userManager)
    {
		_userManager = userManager;
	}

    public IActionResult OnGet(string returnUrl)
    {
		Input = new RegisterViewModel
		{
			ReturnUrl = returnUrl,
		};

		return Page();
    }

	public async Task<IActionResult> OnPost()
	{
		if (Input.Button == "cancel")
			return Redirect("~/");

		if(ModelState.IsValid == true)
		{
			var user = new ApplicationUser
			{
				UserName = Input.Username,
				Email = Input.Email,
				EmailConfirmed = true
			};

			var result = await _userManager.CreateAsync(user, Input.Password);

			if(result.Succeeded == true)
			{
				await _userManager.AddClaimsAsync(user, new Claim[]
				{
					new Claim(ClaimTypes.Name, Input.FullName)
				});

				RegisterSuccess = true;
			}
		}

		return Page();
	}
}
