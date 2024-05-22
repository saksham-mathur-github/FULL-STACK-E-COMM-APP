import { Component } from '@angular/core';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {
  dropdownOpen = false;
  selectedClub: { name: string, description: string, price: string, benefits: string[] } | null = null;

  clubs: { [key: string]: { name: string, description: string, price: string, benefits: string[] } } = {
    premium: {
      name: 'Premium Club',
      description: 'Enjoy exclusive benefits and access with our premium membership.',
      price: '$50/month',
      benefits: [
        'Unlimited access to all facilities',
        'Priority booking for classes and events',
        'Personalized training plans',
        'Free guest passes'
      ]
    },
    medium: {
      name: 'Medium Club',
      description: 'Get great value with our medium membership, offering a wide range of amenities.',
      price: '$30/month',
      benefits: [
        'Access to most facilities',
        'Discounts on classes and events',
        'Group training sessions'
      ]
    }
  };

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectClub(clubName: string) {
    this.selectedClub = this.clubs[clubName as keyof typeof this.clubs];
    this.dropdownOpen = false;
  }

  sendEmail() {
    const email = prompt('Enter email address to send details:');
    if (email) {
      const subject = `Membership Details for ${this.selectedClub?.name}`;
      const body = `Name: ${this.selectedClub?.name}\nDescription: ${this.selectedClub?.description}\nPrice: ${this.selectedClub?.price}\nBenefits: ${this.selectedClub?.benefits.join('\n')}`;
      window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    }
  }
}
