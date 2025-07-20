import { z } from 'zod';

export const wheelSpecificationSchema = z.object({
  formNumber: z.string({ required_error: "formNumber is required." }).min(1, "formNumber cannot be empty."),
  submittedBy: z.string({ required_error: "submittedBy is required." }).min(1, "submittedBy cannot be empty."),
  submittedDate: z.string({ required_error: "submittedDate is required." }).superRefine((val, ctx) => {
    // First, use Zod's built-in date validator to check for a valid date format.
    const dateCheck = z.string().date().safeParse(val);
    if (!dateCheck.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_string,
        validation: "date",
        message: "submittedDate must be a valid date in YYYY-MM-DD format.",
      });
      return; // Stop validation if the format is incorrect.
    }

    // If the date format is valid, then check if it's in the future.
    if (new Date(val) > new Date()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "submittedDate cannot be in the future.",
      });
    }
  }),
  fields: z.object({
    treadDiameterNew: z.string().optional(),
    lastShopIssueSize: z.string().optional(),
    condemningDia: z.string().optional(),
    wheelGauge: z.string().optional(),
    variationSameAxle: z.string().optional(),
    variationSameBogie: z.string().optional(),
    variationSameCoach: z.string().optional(),
    wheelProfile: z.string().optional(),
    intermediateWWP: z.string().optional(),
    bearingSeatDiameter: z.string().optional(),
    rollerBearingOuterDia: z.string().optional(),
    rollerBearingBoreDia: z.string().optional(),
    rollerBearingWidth: z.string().optional(),
    axleBoxHousingBoreDia: z.string().optional(),
    wheelDiscWidth: z.string().optional(),
  }, { required_error: "fields object is required." }).passthrough()
});

export const wheelSpecificationFilterSchema = z.object({
  formNumber: z.string().optional(),
  submittedBy: z.string().optional(),
  submittedDate: z.string().date("submittedDate must be a valid date in YYYY-MM-DD format.").optional(),
});