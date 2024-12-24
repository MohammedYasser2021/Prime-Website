export const splitMessage = (
  message: string
): { english: string; arabic: string } => {
  const parts = message?.split("*#*");

  // if (parts.length !== 2) {
  //   throw new Error(
  //     "Invalid message format. Expected delimiter '*#*' not found."
  //   );
  // }
  const english = parts?.[0]?.trim();
  const arabic = parts?.[1]?.trim();
  return { english, arabic };
};