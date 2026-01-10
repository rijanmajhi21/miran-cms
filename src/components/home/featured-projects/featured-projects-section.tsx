import { FunctionComponent } from "react";
import { FEATURED_PROJECTS } from "./constant";
import ProjectCard from "./project-card";

const FeaturedProjectsSection: FunctionComponent = () => {
  return (
    <section id="projects" className="container">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="text-center flex flex-col gap-1">
          <h2 className="font-heading text-title-4 md:text-title-3">
            Featured Projects
          </h2>
          <p className="text-body-base text-neutral-sub-text">
            A closer look at some of my favorite photography projects
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
