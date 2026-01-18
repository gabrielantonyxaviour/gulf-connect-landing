# Rax-Tech Landing Page - Claude Instructions

## Project Overview

**Project:** Rax-Tech International Corporate Landing Page
**Company:** Technology solutions provider (IoT, Automation, e-Surveillance, Blockchain)
**Stack:** Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS, Shadcn/ui

## Project Structure

```
rax-landing/
├── frontend/               # Next.js application
│   ├── app/               # App router pages
│   ├── components/        # React components
│   │   ├── sections/      # Page sections (hero, about, etc.)
│   │   ├── shared/        # Reusable components
│   │   └── ui/            # Shadcn/ui components
│   ├── lib/               # Utilities and constants
│   │   └── constants.ts   # Centralized data
│   └── public/            # Static assets
├── prompts/               # Generated prompts from strategy skill
├── DATA.md                # All company content and data
└── CLAUDE.md              # This file
```

## Key Resources

- **DATA.md** - Complete company information, products, services, industries
- **frontend/lib/constants.ts** - TypeScript constants for all page data
- **frontend/components/** - Existing component patterns to follow

---

## Multi-Prompt System

This project uses a multi-session prompt system for complex features.

### Running Prompts

When asked to run a prompt:

1. **Read** `prompts/N.md` completely
2. **Activate** the skill specified in the prompt (if any)
3. **Execute** ALL requirements in the prompt
4. **Verify** using the verification steps provided
5. **Delete** the prompt file after successful completion
6. **Report** what was accomplished
7. **List** remaining prompts in `prompts/`

### Examples

```
User: "run prompt 1"
→ Read prompts/1.md, execute all requirements, delete when done

User: "run prompts 1 and 2"
→ Execute both (parallel if independent), delete when done

User: "run prompts 1-3"
→ Execute prompts 1, 2, and 3 sequentially or in parallel as specified
```

### After Completing Prompts

Always report:
1. What was accomplished
2. Files created/modified
3. Any issues encountered
4. Remaining prompts in `prompts/`

---

## Available Skills

### `/strategy` - Strategic Planning
- Enters NO-CODE planning mode
- Breaks goals into executable prompts
- Writes to `prompts/` directory
- Usage: `/strategy <goal>`

### `frontend-dev` - Frontend Development
- Next.js/React component development
- Follows project patterns and conventions
- Uses Tailwind CSS and Shadcn/ui

### `db` - Database Operations
- Supabase database operations
- Direct execution (never generate scripts)
- See `.claude/skills/db/SKILL.md`

---

## Development Guidelines

### Component Patterns
- Use functional components with TypeScript
- Follow existing patterns in `frontend/components/`
- Use Shadcn/ui components where available
- Mobile-first responsive design

### Styling
- Tailwind CSS for all styling
- Follow existing color scheme (see DATA.md)
- Use CSS variables for theming when needed
- Maintain consistent spacing and typography

### Data Management
- Reference `DATA.md` for all company content
- Use `frontend/lib/constants.ts` for TypeScript data
- Keep data centralized, not hardcoded in components

### File Organization
- Sections go in `frontend/components/sections/`
- Reusable components in `frontend/components/shared/`
- Page-specific components alongside pages in `frontend/app/`

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `/strategy <goal>` | Enter planning mode, generate prompts |
| `/debug-issue` | Debug issues using logs |
| `/execute-task` | Execute task with verification |

---

## Quick Reference

### Run Development Server
```bash
cd frontend && npm run dev
```

### Build for Production
```bash
cd frontend && npm run build
```

### Check Types
```bash
cd frontend && npm run type-check
```

---

## Important Notes

1. **Never skip verification** - Always verify changes work as expected
2. **Follow existing patterns** - Check similar components before creating new ones
3. **Mobile-first** - All components must be responsive
4. **Data from sources** - Use DATA.md and constants.ts, don't hardcode
5. **Clean prompts** - Delete executed prompts to avoid confusion

---

## Admin API Guidelines

### Cache Revalidation (CRITICAL)

**ALWAYS use the centralized revalidation utility** in `frontend/lib/revalidation.ts`.

```typescript
// CORRECT - Use the utility
import { revalidateProducts } from '@/lib/revalidation';
revalidateProducts(categoryId);

// WRONG - Don't use revalidatePath directly
import { revalidatePath } from 'next/cache';
revalidatePath('/admin/products');  // Easy to forget paths!
```

Available helpers:
- `revalidateProducts(categoryId?)` - Products and admin pages
- `revalidateCategories(categoryId?)` - Categories and related pages
- `revalidateJobs()` - Jobs and careers page
- `revalidateTestimonials()` - Testimonials and homepage
- `revalidateStatistics()` - Statistics, homepage, about page
- `revalidateMessages()` - Admin messages page
- `revalidateApplications()` - Admin applications page

### Client Component State Pattern

When updating data from dialogs/forms, follow this pattern:

```typescript
const handleDialogSuccess = (updatedItem: Item) => {
  // 1. Update local state FIRST for instant UI reflection
  setItems(prev => {
    const existingIndex = prev.findIndex(i => i.id === updatedItem.id);
    if (existingIndex >= 0) {
      return prev.map(i => i.id === updatedItem.id ? updatedItem : i);
    }
    return [...prev, updatedItem];
  });

  // 2. Refresh server data AFTER with delay to prevent race conditions
  setTimeout(() => router.refresh(), 100);
};
```

### API Route Pattern

```typescript
// api/admin/[resource]/route.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { revalidateResource } from '@/lib/revalidation';

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('table_name')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // ALWAYS revalidate after mutations
  revalidateResource();

  // ALWAYS return the saved data for client-side state updates
  return NextResponse.json(data);
}
```
