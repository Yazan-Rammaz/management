/**
 * Feature generator — the ONE way to start a new feature. Guarantees every
 * slice has the same shape (schema + server api + UI). Run: `npm run gen`.
 *
 * This generator is the seed of a future Claude Code skill: the templates below
 * are the canonical patterns the whole project (and the agent) follow.
 */
export default function (plop) {
  plop.setGenerator("feature", {
    description: "Create a new feature slice (schema + api + list component)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Feature name (kebab-case, e.g. country-managers):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/schema.ts",
        templateFile: "tooling/plop/feature/schema.ts.hbs",
      },
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/api.ts",
        templateFile: "tooling/plop/feature/api.ts.hbs",
      },
      {
        type: "add",
        path: "src/features/{{kebabCase name}}/components/{{pascalCase name}}List.tsx",
        templateFile: "tooling/plop/feature/List.tsx.hbs",
      },
    ],
  });
}
