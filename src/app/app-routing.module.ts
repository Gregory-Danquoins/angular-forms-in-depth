import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CourseComponent } from "./course/course.component";
import { courseResolver } from "./services/course.resolver";
import { CreateCourseComponent } from "./create-course/create-course.component";

const routes: Routes = [
  {
    path: "",
    component: CreateCourseComponent,
  },

  {
    path: "courses/:id",
    component: CourseComponent,
    resolve: {
      course: courseResolver,
    },
  },
  {
    path: "add-new-course",
    component: CreateCourseComponent,
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
