import { Component } from '@angular/core';
import { FooterComponent } from "../../common-ui/footer/footer.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
